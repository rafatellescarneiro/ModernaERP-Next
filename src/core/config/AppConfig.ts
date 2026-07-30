export interface AppConfig {
  appName: string;
  version: string;
  environment: 'development' | 'production' | 'test';
  locale: string;
  timezone: string;
};

export const config: AppConfig = {
  appName: 'Moderna ERP',
  version: '0.1.0',
  environment: 'development',
  locale: 'pt-BR',
  timezone: "America/Sao_Paulo",
};





