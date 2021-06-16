import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';

describe('UserController', () => {
    let controller: UserController;
    const dto: UserCreateDto = {
        email: 'test@test.com',
        phone: '555443322',
        telegramId: 'telegramID',
        walletId: 'walletID',
        password: 'password',
    };

    const mockUserService = {
        create: jest.fn(dto => {
            return {
                id: '00000000-0000-0000-0000-000000000000',
                email: dto.email,
                phone: dto.phone,
                telegramId: dto.telegramId,
                walletId: dto.walletId,
                status: 1,
                balance: 0,
            };
        }),
        update: jest.fn().mockImplementation((id, dto) => ({
            id: '00000000-0000-0000-0000-000000000000',
            email: dto.email,
            phone: dto.phone,
            telegramId: dto.telegramId,
            walletId: dto.walletId,
            status: 1,
            balance: 0,
        })),
        getUser: jest.fn().mockImplementation((userId) => ({
            id: '00000000-0000-0000-0000-000000000000',
            email: dto.email,
            phone: dto.phone,
            telegramId: dto.telegramId,
            walletId: dto.walletId,
            status: 1,
            balance: 0,
        })),
        getUsers: jest.fn().mockImplementation((pageOptionDto) => ({
            data: [
                {
                    id: '9796a722-6638-494b-ab8e-b56b46ee3eb9',
                    createdAt: '2021-05-04T09:05:49.674Z',
                    updatedAt: '2021-05-04T09:05:49.674Z',
                    email: 'test1@gmail.com',
                    phone: '555661277',
                    status: 1,
                    telegramId: '123456789',
                    walletId: '987654321',
                    balance: 0,
                },
                {
                    id: '9796a722-6638-494b-ab8e-b56b46ee3eb9',
                    createdAt: '2021-05-04T09:05:49.674Z',
                    updatedAt: '2021-05-04T09:05:49.674Z',
                    email: 'test2@gmail.com',
                    phone: '555661278',
                    status: 1,
                    telegramId: '123456789',
                    walletId: '987654321',
                    balance: 0,
                },
            ],
            meta: {
                page: 1,
                take: 10,
                itemCount: 2,
                pageCount: 1,
                hasPreviousPage: false,
                hasNextPage: false,
            },
        })),
        delete: jest.fn().mockImplementation((id: string) => ({
            raw: {},
            affected: 1,
        })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(mockUserService)
            .compile();

        controller = module.get<UserController>(UserController);

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a user', async () => {
        const created = await controller.create(dto);
        expect(created).toEqual({
            id: '00000000-0000-0000-0000-000000000000',
            email: dto.email,
            phone: dto.phone,
            telegramId: dto.telegramId,
            walletId: dto.walletId,
            status: 1,
            balance: 0,
        });

        expect(mockUserService.create).toHaveBeenCalled();
    });

    it('should update a user', async () => {
        const updated = await controller
            .update('00000000-0000-0000-0000-000000000000', {
                id: '00000000-0000-0000-0000-000000000000',
                status: 1,
                balance: 0,
                ...dto,
            });
        expect(updated).toEqual({
            id: '00000000-0000-0000-0000-000000000000',
            email: dto.email,
            phone: dto.phone,
            telegramId: dto.telegramId,
            walletId: dto.walletId,
            status: 1,
            balance: 0,
        });

        expect(mockUserService.update).toHaveBeenCalled();
    });

    it('should get a user', async () => {
        const getUser = await controller
            .getUser('00000000-0000-0000-0000-000000000000');
        expect(getUser).toEqual({
            id: '00000000-0000-0000-0000-000000000000',
            email: dto.email,
            phone: dto.phone,
            telegramId: dto.telegramId,
            walletId: dto.walletId,
            status: 1,
            balance: 0,
        });

        expect(mockUserService.getUser).toHaveBeenCalled();
    });

    it('should get a users', async () => {
        const pageOptionsDto: any = {
            page: 1,
            take: 10,
        };
        const getUsers = await controller
            .getUsers(pageOptionsDto);
        expect(getUsers.data.length).toEqual(2);
        expect(getUsers.meta.itemCount).toEqual(2);
        expect(getUsers.meta.pageCount).toEqual(1);
        expect(getUsers.meta.page).toEqual(1);
        expect(getUsers.meta.take).toEqual(10);

        expect(mockUserService.getUsers).toHaveBeenCalled();
    });

    it('should delete a user', async () => {
        const deleteUser = await controller.delete('userid');

        expect(deleteUser.deleted).toEqual(true)
    })
});
