import { ConfigProvider, Spin, message, notification } from 'antd';
import React, { Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import routes from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './global.less';

// import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { logger, LoggerLevel } from './ts/base/common';

moment.locale('cn');
/**
 * React Query client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

message.config({
  prefixCls: 'ogo-message',
});

ConfigProvider.config({
  prefixCls: 'ogo',
});

notification.config({
  prefixCls: 'ogo-notification',
});

const App = () => {
  const [locale] = useState(zhCN);
  logger.onLogger = (level, msg) => {
    switch (level) {
      case LoggerLevel.info:
        message.info(msg);
        break;
      case LoggerLevel.warn:
        message.warn(msg);
        break;
      case LoggerLevel.error:
        message.error(msg);
        break;
    }
  };
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider prefixCls="ogo" locale={locale}>
          <Suspense fallback={<Spin size="large" className="layout__loading" />}>
            {renderRoutes(routes)}
          </Suspense>
        </ConfigProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
