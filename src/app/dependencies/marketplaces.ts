import {
  ApiMarketplaceProvider,
} from '../../modules/marketplace/providers/ApiMarketplaceProvider';

import{
  MarketplaceRepository,
} from "../../modules/marketplace/repositories/MarketplaceRepository";

import {
  MarketplaceService,
} from "../../modules/marketplace/services/MarketplaceService";

export function createMarketplaceService(){

  const provider =
    new ApiMarketplaceProvider();

  const repository =
    new MarketplaceRepository(
      provider
    );

  return new MarketplaceService(
    repository,
  );

}
