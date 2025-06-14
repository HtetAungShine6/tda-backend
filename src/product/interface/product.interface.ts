import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-prodcut.dto";
import { Product } from "../product.schema";

export interface ProductInterface {
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    findProductById(id: string): Promise<Product | null>;
    findAllProducts(): Promise<Product[]>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product | null>;
    deleteProduct(id: string): Promise<Product | null>;
}