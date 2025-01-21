export class CheckProductStatusService {
    private productStatus: string[] = ['failed', 'cancelled', 'none'];
    checkProductStatus(status: string): boolean {
        if (this.productStatus.includes(status.toLowerCase())) {
            return true;
        }
        return false;
    }
}