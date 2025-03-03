class ApiFeatures<T> {
    private query: any;
    private queryStr: Record<string, any>;
  
    constructor(query: any, queryStr: Record<string, any>) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search(): this {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    filter(): this {
      const queryCopy: Record<string, any> = { ...this.queryStr };
  
      // Removing fields from the query
      const removeFields = ["keyword", "limit", "page"];
      removeFields.forEach((el) => delete queryCopy[el]);
  
      // Advanced filter for price, ratings, etc.
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    pagination(resPerPage: number): this {
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resPerPage * (currentPage - 1);
  
      this.query = this.query.limit(resPerPage).skip(skip);
      return this;
    }
  }
  
  export { ApiFeatures };
  