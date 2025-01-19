export class LocalStorageUtils {
    /**
     * Get restrictions from localStorage
     * @returns Parsed restrictions object or null if not found
     */
    static getRestrictions(): any | null {
      const restrictions = localStorage.getItem('restrictions');
      console.log('Restrictions:', restrictions);
      return restrictions ? JSON.parse(restrictions) : null;
    }
  
    /**
     * Save restrictions to localStorage
     * @param restrictions - The restrictions object to save
     */
    static saveRestrictions(restrictions: any): void {
      localStorage.setItem('restrictions', JSON.stringify(restrictions));
    }
  }
  