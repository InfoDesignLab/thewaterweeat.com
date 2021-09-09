import { CrowdinApi, Pagination, ResponseList, ResponseObject } from '../core';
export declare class Users extends CrowdinApi {
    /**
     *
     * @param projectId project identifier
     * @param search search users by firstName, lastName or username
     * @param role defines role type
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectMembers(projectId: number, search?: string, role?: UsersModel.Role, languageId?: string, limit?: number, offset?: number): Promise<ResponseList<UsersModel.ProjectMember>>;
    /**
     *
     * @param projectId project identifier
     * @param request request body
     */
    addProjectMember(projectId: number, request: UsersModel.AddProjectMemberRequest): Promise<UsersModel.AddProjectMemberResponse>;
    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    getProjectMemberPermissions(projectId: number, memberId: number): Promise<ResponseObject<UsersModel.ProjectMember>>;
    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    replaceProjectMemberPermissions(projectId: number, memberId: number, request: UsersModel.ReplaceProjectMemberRequest): Promise<ResponseObject<UsersModel.ProjectMember>>;
    /**
     *
     * @param projectId project identifier
     * @param memberId member identifier
     */
    deleteMemberFromProject(projectId: number, memberId: number): Promise<void>;
    /**
     * @param status filter users by status
     * @param search search users by firstName, lastName, username, email
     * @param twoFactor filter users by two-factor authentication status
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listUsers(status?: UsersModel.Status, search?: string, twoFactor?: UsersModel.TwoFactor, limit?: number, offset?: number): Promise<ResponseList<UsersModel.User>>;
    /**
     * @param userId user identifier
     */
    getUserInfo(userId: number): Promise<ResponseObject<UsersModel.User>>;
    getAuthenticatedUser(): Promise<ResponseObject<UsersModel.User>>;
}
export declare namespace UsersModel {
    interface User {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        status: Status;
        avatarUrl: string;
        createdAt: string;
        lastSeen: string;
        twoFactor: string;
        isAdmin: boolean;
        timezone: string;
    }
    enum Status {
        ACTIVE = "active",
        PENDING = "pending",
        BLOCKED = "blocked"
    }
    enum TwoFactor {
        ENABLED = "enabled",
        DISABLED = "disabled"
    }
    interface ProjectMember {
        id: number;
        username: string;
        fullName: string;
        firstName: string;
        lastName: string;
        isManager: boolean;
        managerOfGroup: Group;
        accessToAllWorkflowSteps: boolean;
        role: Role;
        permissions: any;
        avatarUrl: string;
        joinedAt: string;
        timezone: string;
        givenAccessAt: string;
    }
    interface Group {
        id: number;
        name: string;
    }
    enum Role {
        ALL = "all",
        MANAGER = "manager",
        PROOFREADER = "proofreader",
        TRANSLATOR = "translator",
        BLOCKED = "blocked"
    }
    interface AddProjectMemberRequest {
        userIds: number[];
        accessToAllWorkflowSteps?: boolean;
        managerAccess?: boolean;
        permissions?: any;
    }
    interface AddProjectMemberResponse {
        skipped: ResponseObject<ProjectMember>[];
        added: ResponseObject<ProjectMember>[];
        pagination: Pagination;
    }
    interface ReplaceProjectMemberRequest {
        accessToAllWorkflowSteps?: boolean;
        managerAccess?: boolean;
        permissions?: any;
    }
}
