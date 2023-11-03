import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// это таблица в базе данных, которую создадим
@Entity() // это декоратор
export class User {
  @PrimaryGeneratedColumn() //деоратор для айди
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Category, (category) => category.user, {
    onDelete: 'CASCADE', //необязат 3 параметр, можем указать, что делать с катег юзера, когда его удаляем
  }) //у кажд юзера етсь массив категорий и у табл категорий привязываемся к полю юзер
  categories: Category[]; //тип Category при помощи тайпорм сам создается из модели категорий из ентити
  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    onDelete: 'CASCADE', //необязат 3 параметр, можем указать, что делать с катег юзера, когда его удаляем
  }) //у кажд юзера етсь массив категорий и у табл категорий привязываемся к полю юзер
  transactions: Transaction[]; //свяжем транзакции и юзера, может быть один юзер и много транзакций
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
// у юзера будет связь с категориями по типу один (юзер) ко многим (категориям)
