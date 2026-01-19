
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  config: {
    brandName: 'DrawWeb',
    heroTitle: '중소기업의 디지털 성장을 위한 가장 확실한 선택',
    heroSub: '드로우웹은 제지업, 제조업 등 전통 산업의 디지털 전환을 돕습니다. 화려하기만 한 디자인이 아닌, 매출로 연결되는 비즈니스 웹사이트를 만듭니다.',
    accentColor: '#2563eb', // blue-600
  },
  portfolios: [
    {
      id: '1',
      title: '한결제지(HanGyul Paper)',
      category: 'Manufacturing / Packaging',
      imageUrl: 'https://images.unsplash.com/photo-1589987607627-616cac5c2c5a?auto=format&fit=crop&q=80&w=800',
      description: '30년 전통 제지 회사의 공정 기술력과 친환경 가치를 강조한 기업 브랜드 사이트 구축'
    },
    {
      id: '2',
      title: '미래정밀 금형(Mirae Precision)',
      category: 'Industry / Technology',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
      description: '정밀 금형 가공 기술과 글로벌 수출 역량을 보여주는 다국어 지원 포털 개발'
    },
    {
      id: '3',
      title: '동양금속 솔루션',
      category: 'Hardware / B2B',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      description: '복잡한 부품 카탈로그를 한눈에 볼 수 있는 B2B 제품 갤러리 및 견적 시스템'
    },
    {
      id: '4',
      title: '그린물류 시스템',
      category: 'Logistics / Supply Chain',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      description: '실시간 배송 추적 대시보드 인터페이스를 포함한 중소 물류기업 통합 홈페이지'
    }
  ],
  pricing: [], // 가격 섹션 제거를 위해 비워둠
  inquiries: [
    {
      id: 'inq1',
      name: '김*호',
      email: 'customer@example.com',
      message: '제지 공장 홈페이지 리뉴얼 비용과 기간이 궁금합니다.',
      date: '2024-03-24',
      status: 'new'
    }
  ]
};
