import Users, { IUsers } from '../db/entites/users';

interface IUserService {
    signup(user: IUsers): any
    signin(): any
}

class AuthService implements IUserService {
    public async signup(user: IUsers): Promise<any> {
        try {
            const userExist = await Users.findAll({ where: { email: user.email } });
            if (userExist?.length) {
                throw new Error('Email already exist');
            }
            const userCreated = await Users.create(user)
            return userCreated?.get({ plain: true }) as IUsers || {};
        } catch (e) {
            throw e;
        }
    }
    public signin(): any {
        try {
            return {
            }
        } catch (e) {
            throw e;
        }
    }
}

export default new AuthService();