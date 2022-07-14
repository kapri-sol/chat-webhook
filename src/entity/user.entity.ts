import { KakaoFallbackRoute } from 'src/constant/kakao.constant';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userUid: bigint;

  @Index({
    unique: true,
  })
  @Column()
  kakaoUserId: string;

  @Column({
    nullable: true,
  })
  route: KakaoFallbackRoute;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
