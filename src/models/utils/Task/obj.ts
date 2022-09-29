export class Task {
    static Delay = async (ms: number, func: () => void) => {
        return new Promise((resolve: any) => {
            setTimeout(() => {
                func();
                resolve();
            }, ms)
          });
    }
}