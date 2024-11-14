export interface IBasketDataResponse {
  id: string,
  items: [
    {
      id: number,
      quantity: number,
      created_at: Date,
      updated_at: Date,
      basket: string,
      product: number,
      color: number,
      size: number,
    },
  ];
  created_at: Date,
  updated_at: Date,
  user: 0,
}
