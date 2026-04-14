import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 대화 기록 저장 (실제 운영시 Redis 등 사용)
conversation_history = {}


def get_response(user_id: str, message: str) -> str:
    """LLM으로 부터 응답을 받아옵니다."""
    
    # 사용자의 대화 기록 가져오기
    if user_id not in conversation_history:
        conversation_history[user_id] = [
            {"role": "system", "content": "당신은 친절하고 유용한 AI 어시스턴트입니다. 한국어로 답변해주세요. 한자는 사용하지 마세요."}
        ]
    
    # 현재 메시지 추가
    conversation_history[user_id].append({"role": "user", "content": message})
    
    # LLM 호출
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_history[user_id],
        temperature=0.7,
        max_tokens=500,
    )
    
    # 응답 저장
    assistant_message = response.choices[0].message.content
    conversation_history[user_id].append({"role": "assistant", "content": assistant_message})
    
    # 기록 길이 제한 (최근 10개 메시지만)
    if len(conversation_history[user_id]) > 20:
        conversation_history[user_id] = [
            conversation_history[user_id][0]
        ] + conversation_history[user_id][-19:]
    
    return assistant_message


def get_streaming_response(user_id: str, message: str):
    """streaming 응답을 생성합니다."""
    
    if user_id not in conversation_history:
        conversation_history[user_id] = [
            {"role": "system", "content": "당신은 친절하고 유용한 AI 어시스턴트입니다. 한국어로 답변해주세요. 한자는 사용하지 마세요."}
        ]
    
    conversation_history[user_id].append({"role": "user", "content": message})
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_history[user_id],
        temperature=0.7,
        max_tokens=500,
        stream=True,
    )
    
    full_response = ""
    for chunk in response:
        if chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            full_response += content
            yield content
    
    conversation_history[user_id].append({"role": "assistant", "content": full_response})


def clear_conversation(user_id: str):
    """대화 기록을 초기화합니다."""
    if user_id in conversation_history:
        del conversation_history[user_id]
    return "대화가 초기화되었습니다."
