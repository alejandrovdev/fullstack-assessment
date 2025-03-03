import { AppDataSource } from '../config/data-source';
import { Address } from '../entities/address.entity';

const addressRepository = AppDataSource.getRepository(Address);

export const create = async (data: Partial<Address>): Promise<Address> => {
  const address = addressRepository.create(data);

  return await addressRepository.save(address);
};

export const getAll = async (): Promise<Address[]> => {
  return await addressRepository.find();
};

export const getOneById = async (id: number): Promise<Address | null> => {
  return await addressRepository.findOneBy({ id });
};

export const update = async (
  id: number,
  data: Partial<Address>,
): Promise<Address | null> => {
  const address = await addressRepository.findOneBy({ id });

  if (!address) {
    return null;
  }

  addressRepository.merge(address, data);

  return await addressRepository.save(address);
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await addressRepository.delete(id);

  return (
    result.affected !== undefined &&
    result.affected !== null &&
    result.affected > 0
  );
};
