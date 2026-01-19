
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  config: {
    brandName: 'DrawWeb',
    heroTitle: '맞춤형 홈페이지 제작',
    heroSub: '단순한 웹사이트 구축을 넘어 실제 비즈니스 성과를 창출하는 최적화된 홈페이지를 제공합니다.',
    accentColor: '#2563eb', // blue-600
  },
  portfolios: [
    {
      id: '1',
      title: '친환경 제지 패키징 솔루션',
      category: 'Manufacturing / Packaging',
      imageUrl: 'https://images.unsplash.com/photo-1589987607627-616cac5c2c5a?auto=format&fit=crop&q=80&w=800',
      description: '30년 전통 제지 기업의 공정 기술력과 친환경 가치를 강조한 브랜드 사이트 구축'
    },
    {
      id: '2',
      title: '정밀 금형 가공 기술 포털',
      category: 'Industry / Technology',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
      description: '정밀 금형 가공 기술과 글로벌 수출 역량을 보여주는 다국어 지원 기업 홈페이지 개발'
    },
    {
      id: '3',
      title: 'B2B 금속 부품 통합 카탈로그',
      category: 'Hardware / B2B',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      description: '복잡한 부품 리스트를 직관적으로 조회할 수 있는 제품 갤러리 및 실시간 견적 시스템'
    },
    {
      id: '4',
      title: '스마트 물류 통합 관제 시스템',
      category: 'Logistics / Supply Chain',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      description: '배송 추적 및 물류 데이터 시각화 인터페이스를 포함한 중소 물류기업 디지털 플랫폼'
    }
  ],
  pricing: [], 
  inquiries: [
    {
      id: 'inq1',
      name: '김*호',
      email: 'customer@example.com',
      message: '공장 홈페이지 리뉴얼 비용과 기간이 궁금합니다.',
      date: '2024-03-24',
      status: 'new'
    }
  ]
};
