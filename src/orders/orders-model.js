import { Schema, model } from 'mongoose';
import { validateOrderAssignments } from '../../middlewares/order-logic-validators.js';

// ItemPedido
// Subdocumento para los productos del pedido
const itemPedidoSchema = new Schema({
    id_producto: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    nombre_historico: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    precio_historico: {
        type: Number,
        required: true
    },
    notas: {
        type: String,
        trim: true
    }
});

// Pedido
const orderSchema = new Schema({
    id_usuario_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El cliente es obligatorio']
    },
    id_restaurante: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'El restaurante es obligatorio']
    },
    id_mesero_asignado: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    id_repartidor_asignado: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    items: [itemPedidoSchema],
    total: {
        type: Number,
        required: true,
        default: 0
    },
    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Preparacion', 'Listo', 'Servido', 'Entregado', 'Cancelado'],
        default: 'Pendiente'
    },
    tipo_servicio: {
        type: String,
        required: true,
        enum: ['Comer aquí', 'Domicilio', 'Para llevar'],
        default: 'Comer aquí'
    },
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

orderSchema.pre('save', validateOrderAssignments);

export default model('Order', orderSchema);