import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

/**
 * Converts a string to a valid MongoDB ObjectId.
 * Throws BadRequestException if invalid.
 */
export function toObjectId(id: string): Types.ObjectId {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException(`Invalid MongoDB ObjectId: ${id}`);
  }
  return new Types.ObjectId(id);
}