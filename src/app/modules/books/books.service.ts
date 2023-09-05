import { BookModel, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableFields } from './books.constant';
import { IBookFilter } from './books.interface';

const createBooks = async (data: BookModel): Promise<BookModel | null> => {
  // console.log(user)
  data.publicationDate = new Date(data.publicationDate);
  console.log(data);
  const result = await prisma.bookModel.create({
    data,
  });
  return result;
};
const getAllBooks = async (
  filters: IBookFilter,
  options: IPaginationOptions
) => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  //console.log(filters, 'filters data');
  //console.log(filterData, 'filterData');

  //   console.log(search, filterData, 'filters');
  //   console.log(page, limit, skip, 'pagination');
  //console.log(search);
  const andConditons = [];
  if (search) {
    andConditons.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.entries(filterData).map(([field, value]) => {
        if (field === 'price') {
          const numericValue = parseFloat(value as string);
          return {
            [field]: {
              equals: numericValue,
            },
          };
        } else if (field === 'minPrice') {
          const parseMinPrice = parseInt(value as string);

          return {
            price: {
              lte: parseMinPrice,
            },
          };
        } else if (field === 'maxPrice') {
          const parseMaxPrice = parseInt(value as string);

          return {
            price: {
              gte: parseMaxPrice,
            },
          };
        }
        return {
          [field]: {
            equals: value,
          },
        };
      }),
    });
  }
  // console.log(Object.keys(filterData), 'using key');
  //console.log(Object.entries(filterData), 'using entries');
  const whereConditons: Prisma.BookModelWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.bookModel.findMany({
    where: whereConditons,
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            price: 'desc',
          },
  });

  const total = await prisma.bookModel.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getBookByCategory = async (id: string): Promise<BookModel[]> => {
  // console.log(user)
  const data = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  if (!data) {
    return [];
  }
  return data?.books;
};
export const BookService = {
  createBooks,
  getAllBooks,
  getBookByCategory,
};
