/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "next-pwa" {
  import { NextConfig } from "next";

  type PWAOptions = {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    runtimeCaching?: any[];
  };

  function withPWA(options: PWAOptions): (config: NextConfig) => NextConfig;

  export default withPWA;
}
