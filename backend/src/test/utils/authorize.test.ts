import authorize from 'utils/authorize';
import { IRequest, IResponse } from 'utils/context';
import Role from 'utils/role';

describe('authorize middleware', () => {
  test('returns valid middleware function', () => {
    const middleware = authorize();
    expect(middleware).toBeDefined();
  });
  test('pass when role not provided', () => {
    const middleware = authorize();
    expect(middleware).toBeDefined();
    const request = {
      user: {
        user: {
          role: 'Administrador',
        },
      },
    };
    const next = jest.fn();
    middleware(request as IRequest, {} as IResponse, next);
    expect(next).toHaveBeenCalled();
  });

  test('return 404 when user not provided', () => {
    const middleware = authorize([Role.Admin]);
    expect(middleware).toBeDefined();
    const request = {

    };
    const next = jest.fn();
    expect(() => middleware(request as IRequest, {} as IResponse, next)).toThrowError();
    expect(next).toHaveBeenCalledTimes(0);
  });

  test('return 404 when user does not have role', () => {
    const middleware = authorize([Role.Admin, Role.Becario]);
    expect(middleware).toBeDefined();
    const request = {
      user: {
        user: {
          role: Role.Psicologo,
        },
      },
    };
    const next = jest.fn();
    expect(() => middleware(request as IRequest, {} as IResponse, next)).toThrowError();
    expect(next).toHaveBeenCalledTimes(0);
  });

  test('calls next function when user has role', () => {
    const middleware = authorize([Role.Admin, Role.Becario]);
    expect(middleware).toBeDefined();
    const request = {
      user: {
        user: {
          role: Role.Becario,
        },
      },
    };
    const next = jest.fn();
    middleware(request as IRequest, {} as IResponse, next);
    expect(next).toHaveBeenCalled();
  });
});
