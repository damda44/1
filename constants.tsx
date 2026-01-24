
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  config: {
    brandName: 'DrawWeb',
    heroTitle: '맞춤형 홈페이지 제작',
    heroSub: '단순한 웹사이트 구축을 넘어 실제 비즈니스 성과를 창출하는 최적화된 홈페이지를 제공합니다. 기업의 가치를 높이는 최상의 디지털 경험을 설계합니다.',
    accentColor: '#2563eb',
  },
  portfolios: [
    {
      id: '1',
      title: '친환경 패키징 솔루션 브랜드 사이트',
      category: 'Manufacturing / Packaging',
      imageUrl: 'https://images.unsplash.com/photo-1589987607627-616cac5c2c5a?auto=format&fit=crop&q=80&w=800',
      description: '기술력과 친환경 가치를 강조한 제조업 특화 브랜드 홈페이지'
    },
    {
      id: '2',
      title: '정밀 공정 기술 기업 포털',
      category: 'Industry / Technology',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
      description: '글로벌 수출 역량을 보여주는 다국어 지원 기업 홈페이지'
    },
    {
      id: '3',
      title: 'B2B 부품 통합 카탈로그 시스템',
      category: 'Hardware / B2B',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      description: '복잡한 제품군을 직관적으로 보여주는 제품 갤러리 및 견적 시스템'
    },
    {
      id: '4',
      title: '스마트 물류 관제 플랫폼',
      category: 'Logistics / Supply Chain',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      description: '데이터 시각화 인터페이스를 포함한 물류 기업 디지털 솔루션'
    }
  ],
  pricing: [], 
  inquiries: []
};
