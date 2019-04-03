import { request } from "~/plugins/http";
// 登录
export const requestAdminLogin = params => request.post(`/api/admin/login`, params).then(res => res.data);

// 标签
export const requestAdminTagList = params => request.get(`/api/admin/tag/list`, { params }).then(res => res.data);
export const requestAdminTagAdd = params => request.post(`/api/admin/tag/add`, params).then(res => res.data);

// 文章
export const requestAdminArticleAdd = params => request.post(`/api/admin/article/add`, params).then(res => res.data);
