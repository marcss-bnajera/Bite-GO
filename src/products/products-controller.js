
import Product from "./products-model.js";

/**
 * GET - Listar productos con paginación
 */
export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const query = { activo: true };

        const [products, total] = await Promise.all([
            Product.find(query)
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 }),
            Product.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener productos",
            error: error.message
        });
    }
};

/**
 * GET - Obtener producto por ID
 */
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product || !product.activo) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener producto",
            error: error.message
        });
    }
};

/**
 * GET - Obtener productos por restaurante
 */
export const getProductsByRestaurant = async (req, res) => {
    try {
        const { id_restaurante } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const query = { id_restaurante, activo: true };

        const [products, total] = await Promise.all([
            Product.find(query)
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 }),
            Product.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener productos del restaurante",
            error: error.message
        });
    }
};

/**
 * POST - Crear un nuevo producto
 */
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({
            success: true,
            message: "Producto creado exitosamente",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear producto",
            error: error.message
        });
    }
};

/**
 * PUT - Actualizar un producto
 */
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Producto actualizado",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar producto",
            error: error.message
        });
    }
};

/**
 * DELETE - Desactivar un producto
 */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Producto desactivado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar producto",
            error: error.message
        });
    }
};
