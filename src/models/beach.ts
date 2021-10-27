import mongoose, { Document, Model } from 'mongoose';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  _id?: string;
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
}

const schema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface BeachModel extends Omit<Beach, '_id'>, Document {}
// Da maneira criada no curso, exibe erro no typescript e o teste falha
// erro exibido
//  src/models/beach.ts:38:14 - error TS2322: Type 'Model<Document<any, any, any>, any, any>' is not assignable to type 'Model<BeachModel, {}, {}>'.
//       The types returned by 'create(...)' are incompatible between these types.
//         Type 'Promise<Document<any, any, any>[]>' is not assignable to type 'Promise<BeachModel[]>'.
//           Type 'Document<any, any, any>[]' is not assignable to type 'BeachModel[]'.
//             Type 'Document<any, any, any>' is not assignable to type 'BeachModel'.

export const Beach: Model<BeachModel> = mongoose.model('Beach', schema);

// não exibe o erro do typescript, o teste passa, mas não faz a transformação do toJson no banco de dados
// {
//   "_id": { "$oid": "6177ce2acd5d0d2f847ada94" },
//   "lat": -33.792726,
//   "lng": 151.289824,
//   "name": "Manly",
//   "position": "E",
//   "__v": 0
// }
// export const Beach: Model<BeachModel> = mongoose.model<BeachModel>(
//   'Beach',
//   schema
// );
