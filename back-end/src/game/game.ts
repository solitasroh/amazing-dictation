import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Game {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
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
