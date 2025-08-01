import { registerEnumType } from "@nestjs/graphql";



export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
}

registerEnumType(UserStatus, {
    name: 'UserStatus',
    description: 'The status of the user in the system',
    valuesMap: {
        ACTIVE: {
            description: 'The user is active',
        },
        INACTIVE: {
            description: 'The user is inactive',
        },
        SUSPENDED: {
            description: 'The user is suspended',
        },
    },
});