import json
import os
from typing import Dict, List
from dotenv import load_dotenv

from openai import OpenAI
import pika
from youtube_transcript_api import YouTubeTranscriptApi

load_dotenv()

# Set up OpenAI API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
client = OpenAI(
    api_key=GOOGLE_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

# Set up RabbitMQ connection
rabbitmq_url = os.getenv("RABBITMQ_URL")
connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
channel = connection.channel()

# Declare RabbitMQ queues
channel.queue_declare(queue="video_queue", durable=True)
channel.queue_declare(queue="course_notes_queue", durable=True)


def get_transcript(video_id: str) -> List[Dict[str, str]]:
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return transcript
    except Exception as e:
        print(f"Error fetching transcript for video {video_id}: {str(e)}")
        return []


def generate_course_notes(transcript: List[Dict[str, str]]) -> str:
    full_text = " ".join([entry["text"] for entry in transcript])

    prompt = f"""
    Based on the following transcript, generate a markdown-formatted course notes document.
    Include a title, subtitle, and sections with timestamps. Format as follows:

    # Title
    ## Subtitle

    ## Section 1 [HH:MM:SS]
    Content...

    ## Section 2 [HH:MM:SS]
    Content...

    Transcript:
    {full_text}
    """

    response = client.chat.completions.create(
        model="gemini-1.5-flash",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that creates course notes from video transcripts.",
            },
            {"role": "user", "content": prompt},
        ],
        n=1,
    )

    return response.choices[0].message.content


def process_video(video_id: str):
    transcript = get_transcript(video_id)
    if not transcript:
        return

    course_notes = generate_course_notes(transcript)

    # Publish the course notes to RabbitMQ
    channel.basic_publish(
        exchange="",
        routing_key="course_notes_queue",
        body=json.dumps({"video_id": video_id, "course_notes": course_notes}),
        properties=pika.BasicProperties(delivery_mode=2),  # Make message persistent
    )

    print(f"Course notes for video {video_id} have been generated and published.")


def callback(ch, method, properties, body):
    video_id = body.decode()
    process_video(video_id)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue="video_queue", on_message_callback=callback)
    print("Started consuming messages from video_queue")
    channel.start_consuming()


if __name__ == "__main__":
    main()
