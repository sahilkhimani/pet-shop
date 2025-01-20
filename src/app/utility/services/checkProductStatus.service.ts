export class CheckProductStatusService {
    private productStatus: string[] = ['failed', 'cancelled'];
    checkProductStatus(status: string): boolean {
        if (this.productStatus.includes(status.toLowerCase())) {
            return true;
        }
        return false;
    }
}