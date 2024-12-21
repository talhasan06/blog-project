import mongoose from "mongoose";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError.js";
class QueryBuilder {
    modelQuery;
    query;
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const search = this?.query?.search;
        if (this?.query?.search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = { ...this.query };
        const excludeFields = [
            "search",
            "sortBy",
            "sortOrder",
            "limit",
            "page",
            "fields",
        ];
        excludeFields.forEach((el) => delete queryObj[el]);
        if (queryObj.filter) {
            const filterId = queryObj.filter;
            if (!mongoose.Types.ObjectId.isValid(filterId)) {
                throw new ApiError(httpStatus.NOT_FOUND, "Invalid ID provided");
            }
            // Set the filter as author ID
            queryObj.author = filterId;
            delete queryObj.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        const sortBy = this?.query?.sortBy || "createdAt";
        const sortOrder = this?.query?.sortOrder || "desc";
        const sortStr = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
        this.modelQuery = this.modelQuery.sort(sortStr);
        return this;
    }
    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        const fields = this?.query?.fields?.split(",").join(" ") || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
export default QueryBuilder;
