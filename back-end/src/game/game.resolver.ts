import {
  Args,
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  Int,
} from '@nestjs/graphql';
import { Game } from './game';
import { GameService } from './game.service';
import { makeMp3 } from '../utils/YoutubeUtility';

@InputType()
export class GameCreateInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  singer: string;

  @Field({ nullable: true })
  preSectionLyrics: string;

  @Field({ nullable: true })
  postSectionLyrics: string;

  @Field(() => [String], { nullable: true })
  questionLyrics: string[];

  @Field(() => Int, { nullable: true })
  preSectionPlayStartTime: number;

  @Field(() => Int, { nullable: true })
  preSectionPlayEndTime: number;

  @Field(() => Int, { nullable: true })
  questionSectionPlayStartTime: number;

  @Field(() => Int, { nullable: true })
  questionSectionPlayEndTime: number;

  @Field({ nullable: true })
  songYoutubeLinkUrl: string;

  @Field({ nullable: true })
  musicFileLinkUrl: string;
}

@Resolver(Game)
export class GameResolver {
  constructor(private gamesService: GameService) {}

  @Query(() => Game, { name: 'game' })
  game(@Args('id', { type: () => Int }) id: number): Promise<Game> {
    return this.gamesService.game(id);
  }

  @Query(() => [Game], { nullable: true })
  games(): Promise<Game[]> {
    return this.gamesService.allGames();
  }

  @Mutation(() => Game)
  async createGame(@Args('data') data: GameCreateInput) {
    const game = await this.gamesService.createGame(data);

    await makeMp3(game.id, data.songYoutubeLinkUrl, async (fileLink) => {
      await this.gamesService.writeGameFileLink(game.id, fileLink);
    });

    return game;
  }

  @Mutation(() => Game)
  async updateGame(
    @Args('data') data: GameCreateInput,
    @Args('id') id: number,
  ) {
    await this.gamesService.updateGame(id, { id, ...data });
  }

  @Mutation(() => Game)
  async deleteGame(@Args('id') id: number) {
    return await this.gamesService.deleteGame(id);
  }
}
