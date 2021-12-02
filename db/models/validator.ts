import mongoose from 'mongoose'
import Connection from '../connection'

interface IDelegator {
  public_key: string;
  staked_amount: string;
}

export interface IValidator extends mongoose.Document {
  public_key: string;
  timestamp: number;
  inactive: boolean;
  delegation_rate: number;
  delegators: IDelegator[];
  total_stake: string;
  self_stake: string;
  current_stake: string;
  delegators_stake: string;
  version: string;
  ip: string;
  vps: string;
  country: string;
  latitude: number;
  longitude: number;
}

const ValidatorSchema = new mongoose.Schema<IValidator>({
  public_key: { type: String, required: true },
  timestamp: Number,
  inactive: Boolean,
  delegation_rate: Number,
  delegators: Array,
  total_stake: String,
  self_stake: String,
  current_stake: String,
  delegators_stake: String,
  version: String,
  ip: String,
  vps: String,
  country: String,
  latitude: Number,
  longitude: Number
})

export const Validator = Connection.model<IValidator>('Validator', ValidatorSchema)
