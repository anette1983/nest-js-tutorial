import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    //из токена вытаскиваем айди пользователя и по нему находим пользователя
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.categoryService.findAll(+req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) //не работает валидация, когда ввожу не валидную категорию, найти причину! приходит пустой ответ 210 ок, та же проблема на аутентификации - когда не аутентифицирован - то интернал сервер еррор вместо анавторайзд
  // причину нашла - забыла прописать в сервисе условие на этот случай
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // @ApiCreatedResponse({
  //   description: 'The category has been deleted successfully.',
  //   type: {
  //     id;
  //     title;
  //   },
  // })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
