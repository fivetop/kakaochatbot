from flask import Flask, request, jsonify
from bot.llm import get_response, clear_conversation

app = Flask(__name__)


@app.route('/skill', methods=['POST'])
def skill_handler():
    """카카오 스킬 메시지 처리"""
    body = request.json
    user_id = body.get('userRequest', {}).get('user', {}).get('id', 'unknown')
    message = body.get('userRequest', {}).get('utterance', '')

    # 이미지 처리 (이미지가 있는 경우)
    # attachments = body.get('userRequest', {}).get('attachments', [])
    
    # LLM 응답 생성
    response_text = get_response(user_id, message)
    
    # 카카오 스킬 응답 형식
    result = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": response_text
                    }
                }
            ],
            "quickReplies": [
                {
                    "label": "대화 초기화",
                    "action": "message",
                    "messageText": "대화초기화"
                },
                {
                    "label": "도움말",
                    "action": "message",
                    "messageText": "도움말"
                }
            ]
        }
    }
    
    return jsonify(result)


@app.route('/skill/validation', methods=['GET', 'POST'])
def skill_validation():
    """스킬 검증"""
    return jsonify({"status": "ok"})


@app.route('/skill/dictionary', methods=['GET', 'POST'])
def skill_dictionary():
    """발화 저장소"""
    return jsonify({"status": "ok"})


@app.route('/health', methods=['GET'])
def health_check():
    """헬스 체크"""
    return jsonify({"status": "healthy"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
