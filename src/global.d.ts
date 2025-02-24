// global.d.ts
declare interface Window {
    __TAURI__: {
      fs: {
        readBinaryFile: (path: string) => Promise<Uint8Array>;
      };
      path: {
        resolveResource: (path: string) => Promise<string>;
      };
    };
  }