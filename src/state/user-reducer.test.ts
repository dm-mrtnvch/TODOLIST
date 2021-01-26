import {ActionType, UserReducer, UserType} from './user-reducer';


test('increment age', () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount: 3
    }

    const endUser = UserReducer(startUser, {type: 'INCREMENT-AGE'})

    expect(endUser.age).toBe(30)
})

test('increment children count', () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount: 3
    }

    const endUser = UserReducer(startUser, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endUser.childrenCount).toBe(4)
})


test('change name', () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount: 3
    }

    const myAction: ActionType = {type: 'CHANGE-NAME', newName: 'Bob'}

    const endUser = UserReducer(startUser, myAction)
    expect(endUser.name).toBe('Bob')                                                                                                                                                                          ).toBe(bob)
})