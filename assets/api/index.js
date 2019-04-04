import { request } from "~/plugins/http";
import { config } from "~/server/config";
const domin = config[process.env.NODE_ENV].domin;
// 登录
export const requestAdminLogin = params => request.post(`/api/admin/login`, params).then(res => res.data);

// 标签
export const requestAdminTagList = params => request.get(`/api/admin/tag/list`, { params }).then(res => res.data);
export const requestTagList = params => request.get(`${domin}/api/tag/list`, { params }).then(res => res.data);
export const requestAdminTagAdd = params => request.post(`/api/admin/tag/add`, params).then(res => res.data);

// 文章
export const requestArticleList = params => request.get(`${domin}/api/article/list`, {params}).then(res => res.data);
export const requestAdminArticleAdd = params => request.post(`/api/admin/article/add`, params).then(res => res.data);
