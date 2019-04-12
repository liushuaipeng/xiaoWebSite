import { request } from "~/plugins/http";
import { config } from "~/server/config";

export const domin = config[process.env.NODE_ENV].domin;
// 登录
export const requestAdminLogin = params => request.post(`/api/admin/login`, params).then(res => res.data);

// 标签
export const requestAdminTagList = params => request.get(`/api/admin/tag/list`, { params }).then(res => res.data);
export const requestTagList = params => request.get(`${domin}/api/tag/list`, { params }).then(res => res.data);
export const requestAdminTagAdd = params => request.post(`/api/admin/tag/add`, params).then(res => res.data);
// 取消标签与文章的关联
export const requestAdminTagCancel = params => request.post(`/api/admin/tag/cancel`, params).then(res => res.data);


// 文章
export const requestArticleList = params => request.get(`${domin}/api/article/list`, { params }).then(res => res.data);
export const requestArticleDetail = params => request.get(`${domin}/api/article/detail`, { params }).then(res => res.data);
export const requestAdminArticleList = params => request.get(`/api/admin/article/list`, { params }).then(res => res.data);
export const requestAdminArticleByids = params => request.get(`/api/admin/article/byids`, { params }).then(res => res.data);
export const requestAdminArticleAdd = params => request.post(`/api/admin/article/add`, params).then(res => res.data);
