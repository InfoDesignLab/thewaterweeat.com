"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = exports.Users = void 0;
const core_1 = require("../core");
class Users extends core_1.CrowdinApi {
    /**
     *
     * @param projectId project identifier
     * @param search search users by firstName, lastName or username
     * @param role defines role type
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectMembers(projectId, search, role, languageId, limit, offset) {
        let url = `${this.url}/projects/${projectId}/members`;
        url = this.addQueryParam(url, 'search', search);
        url = this.addQueryParam(url, 'role', role);
        url = this.addQueryParam(url, 'languageId', languageId);
        return this.getList(url, limit, offset);
    }
    /**
     *
     * @param projectId project identifier
     * @param request request body
     */
    addProjectMember(projectId, request) {
        const url = `${this.url}/projects/${projectId}/members`;
        return this.post(url, request, this.defaultConfig());
    }
    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    getProjectMemberPermissions(projectId, memberId) {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.get(url, this.defaultConfig());
    }
    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    replaceProjectMemberPermissions(projectId, memberId, request) {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.put(url, request, this.defaultConfig());
    }
    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    deleteMemberFromProject(projectId, memberId) {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.delete(url, this.defaultConfig());
    }
    /**
     * @param status filter users by status
     * @param search search users by firstName, lastName, username, email
     * @param twoFactor filter users by two-factor authentication status
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listUsers(status, search, twoFactor, limit, offset) {
        let url = `${this.url}/users`;
        url = this.addQueryParam(url, 'status', status);
        url = this.addQueryParam(url, 'search', search);
        url = this.addQueryParam(url, 'twoFactor', twoFactor);
        return this.getList(url, limit, offset);
    }
    /**
     * @param userId user identifier
     */
    getUserInfo(userId) {
        const url = `${this.url}/users/${userId}`;
        return this.get(url, this.defaultConfig());
    }
    getAuthenticatedUser() {
        const url = `${this.url}/user`;
        return this.get(url, this.defaultConfig());
    }
}
exports.Users = Users;
var UsersModel;
(function (UsersModel) {
    let Status;
    (function (Status) {
        Status["ACTIVE"] = "active";
        Status["PENDING"] = "pending";
        Status["BLOCKED"] = "blocked";
    })(Status = UsersModel.Status || (UsersModel.Status = {}));
    let TwoFactor;
    (function (TwoFactor) {
        TwoFactor["ENABLED"] = "enabled";
        TwoFactor["DISABLED"] = "disabled";
    })(TwoFactor = UsersModel.TwoFactor || (UsersModel.TwoFactor = {}));
    let Role;
    (function (Role) {
        Role["ALL"] = "all";
        Role["MANAGER"] = "manager";
        Role["PROOFREADER"] = "proofreader";
        Role["TRANSLATOR"] = "translator";
        Role["BLOCKED"] = "blocked";
    })(Role = UsersModel.Role || (UsersModel.Role = {}));
})(UsersModel = exports.UsersModel || (exports.UsersModel = {}));