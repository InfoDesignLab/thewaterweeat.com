import { BooleanInt, CrowdinApi, PatchRequest, ResponseList, ResponseObject } from '../core';
import { LanguagesModel } from '../languages';
export declare class ProjectsGroups extends CrowdinApi {
    /**
     * @param parentId parent group identifier
     * @param offset starting offset in the collection (default 0)
     * @param userId get user own projects
     * @param limit maximum number of items to retrieve (default 25)
     */
    listGroups(parentId?: number, offset?: number, userId?: number, limit?: number): Promise<ResponseList<ProjectsGroupsModel.Group>>;
    /**
     * @param request request body
     */
    addGroup(request: ProjectsGroupsModel.AddGroupRequest): Promise<ResponseObject<ProjectsGroupsModel.Group>>;
    /**
     * @param group group identifier
     */
    getGroup(groupId: number): Promise<ResponseObject<ProjectsGroupsModel.Group>>;
    /**
     * @param groupId group identifier
     */
    deleteGroup(groupId: number): Promise<void>;
    /**
     * @param groupId group identifier
     * @param request request body
     */
    editGroup(groupId: number, request: PatchRequest[]): Promise<ResponseObject<ProjectsGroupsModel.Group>>;
    /**
     * @param groupId group identifier
     * @param hasManagerAccess projects with manager access (default 0)
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjects(groupId?: number, hasManagerAccess?: BooleanInt, limit?: number, offset?: number): Promise<ResponseList<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>>;
    /**
     * @param request request body
     */
    addProject(request: ProjectsGroupsModel.CreateProjectRequest): Promise<ResponseObject<ProjectsGroupsModel.Project>>;
    /**
     * @param projectId project identifier
     */
    getProject(projectId: number): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>>;
    /**
     * @param projectId project identifier
     */
    deleteProject(projectId: number): Promise<void>;
    /**
     * @param projectId project identifier
     * @param request request body
     */
    editProject(projectId: number, request: PatchRequest[]): Promise<ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings>>;
}
export declare namespace ProjectsGroupsModel {
    interface Group {
        id: number;
        name: string;
        description: string;
        parentId: number;
        organizationId: number;
        userId: number;
        subgroupsCount: number;
        projectsCount: number;
        createdAt: string;
        updatedAt: string;
    }
    interface AddGroupRequest {
        name: string;
        parentId?: number;
        description?: string;
    }
    interface Project {
        id: number;
        groupId: number;
        userId: number;
        sourceLanguageId: string;
        targetLanguageIds: string[];
        languageAccessPolicy: LanguageAccessPolicy;
        name: string;
        cname: string;
        identifier: string;
        description: string;
        visibility: string;
        logo: string;
        background: string;
        isExternal: boolean;
        externalType: string;
        workflowId: number;
        hasCrowdsourcing: boolean;
        publicDownloads: boolean;
        createdAt: string;
        updatedAt: string;
        lastActivity: string;
        targetLanguages: LanguagesModel.Language[];
    }
    interface CreateProjectRequest {
        name: string;
        sourceLanguageId: string;
        templateId?: number;
        groupId?: number;
        targetLanguageIds?: string[];
        vendorId?: number;
        mtEngineId?: number;
        description?: string;
        translateDuplicates?: TranslateDuplicates;
        isMtAllowed?: boolean;
        autoSubstitution?: boolean;
        autoTranslateDialects?: boolean;
        publicDownloads?: boolean;
        useGlobalTm?: boolean;
        delayedWorkflowStart?: boolean;
        skipUntranslatedStrings?: boolean;
        skipUntranslatedFiles?: boolean;
        exportApprovedOnly?: boolean;
        exportWithMinApprovalsCount?: number;
        type?: Type;
        cname?: string;
        languageAccessPolicy?: LanguageAccessPolicy;
        visibility?: JoinPolicy;
        identifier?: string;
        normalizePlaceholder?: boolean;
        saveMetaInfoInSource?: boolean;
        inContext?: boolean;
        inContextProcessHiddenStrings?: boolean;
        inContextPseudoLanguageId?: string;
        qaCheckIsActive?: boolean;
        qaCheckCategories?: CheckCategories;
        customQaCheckIds?: number[];
        languageMapping?: LanguageMapping;
    }
    interface ProjectSettings extends Project {
        translateDuplicates: TranslateDuplicates;
        isMtAllowed: boolean;
        autoSubstitution: boolean;
        exportTranslatedOnly: boolean;
        skipUntranslatedStrings: boolean;
        skipUntranslatedFiles: boolean;
        exportApprovedOnly: boolean;
        exportWithMinApprovalsCount: number;
        autoTranslateDialects: boolean;
        useGlobalTm: boolean;
        normalizePlaceholder: boolean;
        saveMetaInfoInSource: boolean;
        inContext: boolean;
        inContextProcessHiddenStrings: string;
        inContextPseudoLanguageId: string;
        isSuspended: string;
        qaCheckIsActive: boolean;
        qaCheckCategories: CheckCategories;
        customQaCheckIds: number[];
        languageMapping: LanguageMapping;
        inContextPseudoLanguage: LanguagesModel.Language;
        delayedWorkflowStart: boolean;
    }
    enum Type {
        FILES_BASED = 0,
        STRINGS_BASED = 1
    }
    enum JoinPolicy {
        OPEN = "open",
        PRIVATE = "private"
    }
    enum LanguageAccessPolicy {
        OPEN = "open",
        MODERATE = "moderate"
    }
    interface CheckCategories {
        empty: boolean;
        size: boolean;
        tags: boolean;
        spaces: boolean;
        variables: boolean;
        punctuation: boolean;
        symbolRegister: boolean;
        specialSymbols: boolean;
        wrongTranslation: boolean;
        spellcheck: boolean;
        icu: boolean;
        terms: boolean;
        duplicate: boolean;
    }
    interface LanguageMapping {
        [key: string]: LanguageMappingEntity;
    }
    interface LanguageMappingEntity {
        name: string;
        two_letters_code: string;
        three_letters_code: string;
        locale: string;
        locale_with_underscore: string;
        android_code: string;
        osx_code: string;
        osx_locale: string;
    }
    enum TranslateDuplicates {
        SHOW = 0,
        HIDE_REGULAR_DETECTION = 1,
        SHOW_AUTO_TRANSLATE = 2,
        SHOW_WITHIN_VERION_BRANCH_REGULAR_DETECTION = 3,
        HIDE_STRICT_DETECTION = 4,
        SHOW_WITHIN_VERION_BRANCH_STRICT_DETECTION = 5
    }
}
