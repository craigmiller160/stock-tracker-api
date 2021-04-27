import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { TRADIER_API_KEY, TRADIER_BASE_URL } from '../config/keys';

@Injectable
class TradierService {
    private instance: AxiosInstance
    constructor(private readonly configService: ConfigService) {
        this.instance = axios.create({
            baseURL: configService.get<string>(TRADIER_BASE_URL),
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${configService.get<string>(TRADIER_API_KEY)}`
            }
        });
    }
}