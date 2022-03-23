export type RoleId = string;
export type RoleType = 'ADMIN' | 'USER' | 'SPECIALIST';

export interface Role {
    roleId: RoleId;
    value: RoleType;
    description: string;
}

export interface WithRoles {
    roles: Role[];
}