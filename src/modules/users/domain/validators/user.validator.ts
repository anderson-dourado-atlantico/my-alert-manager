import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createdAt?: Date

  constructor(data: UserProps) {
    Object.assign(this, data)
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: any): boolean {
    return super.validate(new UserRules(data ?? {}))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}