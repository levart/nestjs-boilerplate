import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import '../../boilerplate.polyfill';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/UserUpdateDto';

export const usersArray = [
    {
        id: 2,
        email: 'test1@gmail.com',
        phone: '555661277',
        status: 1,
        telegramId: '123456789',
        walletId: '987654321',
        balance: 0,
    },
    {
        id: 2,
        email: 'test2@gmail.com',
        phone: '555661278',
        status: 1,
        telegramId: '123456789',
        walletId: '987654321',
        balance: 0,
    }];
const oneUser = {
    id: 1,
    email: 'test2@gmail.com',
    phone: '555661278',
    status: 1,
    telegramId: '123456789',
    walletId: '987654321',
    balance: 0,
};

describe('UserService', () => {
    let service: UserService;
    let repo: Repository<UserEntity>;

    const dto: UserCreateDto = {
        email: 'test@test.com',
        phone: '555443322',
        telegramId: 'telegramID',
        walletId: 'walletID',
        password: 'password',
    };

    const mockUserRepository = {
        createQueryBuilder: jest.fn(() => ({
            delete: jest.fn().mockReturnThis(),
            innerJoinAndSelect: jest.fn().mockReturnThis(),
            innerJoin: jest.fn().mockReturnThis(),
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            execute: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            paginate: jest.fn().mockReturnThis(),
            take: () => ({
                skip: (cnt) => ({
                    skip: cnt,
                }),
            }),
        })),
        findOne: jest.fn().mockResolvedValue(oneUser),
        create: jest.fn().mockReturnValue(oneUser),
        save: jest.fn(),
        update: jest.fn().mockResolvedValue(true),
        delete: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should findOneForAuth', async () => {
        const findUser = await service.findOneForAuth('test2@gmail.com');
        expect(findUser).toEqual(oneUser);
        expect(mockUserRepository.findOne).toHaveBeenCalled();
    });

    it('should findOne', async () => {
        const findUser = await service.findOne('1');
        expect(findUser).toEqual(oneUser);
        expect(mockUserRepository.findOne).toHaveBeenCalled();
    });


    it('should getUsers', async () => {
        const pageOptionsDto: any = {
            page: 1,
            take: 10,
        };
        const users = await service.getUsers(pageOptionsDto);
        expect(users).toEqual(usersArray);

    });

    it('should getUser', () => {
        expect(service.findOne('1')).resolves.toEqual(oneUser);
        expect(mockUserRepository.findOne).toHaveBeenCalled();
    });

    it('should create a user', async () => {
        //TODO
    });

    it('should update a user', () => {
        const dto: UserUpdateDto = {
            id: '00000000-0000-0000-0000-000000000000',
            email: 'test@test.com',
            phone: '555443322',
            telegramId: 'telegramID',
            walletId: 'walletID',
            status: 1,
            balance: 1,
        };
        expect(service.update(dto.id, dto)).resolves.toEqual(oneUser);
    });

    it('delete should return {deleted: true}', () => {
        expect(service.delete('1')).resolves.toEqual({ deleted: true });
    });
});
