
import { Schema, model } from 'mongoose';

// Receta
// Subdocumento para los ingredientes/insumos del producto
const recetaSchema = new Schema({
    nombre_insumo: {
        type: String,
        required: true
    },
    cantidad_requerida: {
        type: Number,
        required: true
    }
});

// Producto
const productSchema = new Schema({
    id_restaurante: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'El restaurante es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['Entradas', 'Platos', 'Bebidas', 'Postres', 'Otros'],
        default: 'Platos'
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    disponibilidad: {
        type: Boolean,
        default: true
    },
    foto_url: {
        type: [String],
        default: []
    },
    receta: [recetaSchema],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

export default model('Product', productSchema);
