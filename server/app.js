const express = require('express');
require('dotenv').config({ path: __dirname + '/../.env' });

const app = express();
app.use(express.json());

const faq = {
  '인사': '안녕하세요! 무엇을 도와드릴까요?',
  '안녕': '안녕하세요! 반갑습니다!',
  '반갑': '반갑습니다! 도움말을 요청해보세요.',

  '영업시간': '저희 매장은 매일 오전 9시부터 오후 6시까지 운영합니다.',
  '운영시간': '저희 매장은 매일 오전 9시부터 오후 6시까지 운영합니다.',
  '시간': '저희 매장은 매일 오전 9시부터 오후 6시까지 운영합니다.',

  '주소': '저희 매장은 서울특별시 강남구 테헤란로 123에 있습니다.',
  '위치': '저희 매장은 서울특별시 강남구 테헤란로 123에 있습니다.',

  '전화': '문의 전화는 02-1234-5678 입니다.',
  '연락처': '연락처는 02-1234-5678 입니다.',
  '번호': '연락처는 02-1234-5678 입니다.',

  '가격': '상품 가격은 상품별로 상이합니다. конкре적인 상품명을 알려주시면 답변드리겠습니다.',
  '비용': '상품 가격은 상품별로 상이합니다. 구체적인 상품명을 알려주시면 답변드리겠습니다.',

  '배송': '배송은 주문 후 2~3일 이내에 진행됩니다. 제주도 및 도서지역은 3~5일 소요됩니다.',
  '배달': '배송은 주문 후 2~3일 이내에 진행됩니다. 제주도 및 도서지역은 3~5일 소요됩니다.',

  '환불': '환불은 구매 후 7일 이내에 요청하시면 됩니다. 상품 상태 확인 후 3~5일 내에 처리됩니다.',
  '반품': '반품은 구매 후 7일 이내에 요청하시면 됩니다. 상품 상태 확인 후 3~5일 내에 처리됩니다.',
  '취소': '주문 취소는 배송 전까지 가능합니다. 이미 배송된 경우 환불 절차가 진행됩니다.',

  '교환': '상품 교환은 불량품에 한하여 가능합니다. 교환 요청 후 2~3일 내에 배송됩니다.',

  '도움말': '원하는 질문을 입력해보세요! 영업시간, 주소, 배송, 환불, 교환 등에 대해 답변드리겠습니다.',
  '도움': '원하는 질문을 입력해보세요! 영업시간, 주소, 배송, 환불, 교환 등에 대해 답변드리겠습니다.',

  '기본': '안녕하세요! 무엇을 도와드릴까요? 영업시간, 주소, 배송, 환불, 교환 등의 질문을 받았습니다.'
};

function findAnswer(message) {
  const msg = message.toLowerCase();
  
  for (const [key, value] of Object.entries(faq)) {
    if (msg.includes(key)) {
      return value;
    }
  }
  
  return '죄송합니다. 해당 질문에 대한 답변이 없습니다. 다른 질문을 해주세요. 영업시간, 주소, 배송, 환불, 교환 등에 대해 질문해보세요.';
}

app.post('/skill', (req, res) => {
  const body = req.body;
  const message = body.userRequest?.utterance || '';
  
  const responseText = findAnswer(message);

  const result = {
    version: '2.0',
    template: {
      outputs: [
        {
          simpleText: {
            text: responseText
          }
        }
      ],
      quickReplies: [
        { label: '영업시간', action: 'message', messageText: '영업시간' },
        { label: '주소', action: 'message', messageText: '주소' },
        { label: '배송', action: 'message', messageText: '배송' },
        { label: '환불', action: 'message', messageText: '환불' },
        { label: '도움말', action: 'message', messageText: '도움말' }
      ]
    }
  };

  res.json(result);
});

app.post('/skill/validation', (req, res) => res.json({ status: 'ok' }));
app.post('/skill/dictionary', (req, res) => res.json({ status: 'ok' }));
app.get('/health', (req, res) => res.json({ status: 'healthy' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
