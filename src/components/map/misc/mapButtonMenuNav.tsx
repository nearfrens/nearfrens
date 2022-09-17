import { BookmarkIcon, Cog8ToothIcon, MapPinIcon, PencilSquareIcon, PuzzlePieceIcon, ServerIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { HorizontalLine } from "../../common/horizontalLine";
import { PublicIconForDiscord, PublicIconForGithub, PublicIconForTelegram, PublicIconForTwitter } from "../../icons/publicIcon";
import { MapButtonSliderItem } from "./mapButtonSliderItem";
import { MapButtonSliderTitle } from "./mapButtonSliderTitle";


export const MapButtonMenuNav = (props: { onClose: React.DispatchWithoutAction }) => {
    return (
        <div className="min-h-full flex flex-col items-stretch justify-between pointer-events-auto">

            <div className="flex flex-col items-stretch justify-start divide-y-[0.2px] divide-stone-600">

                <MapButtonSliderTitle title={ "NearFrens" } onClose={ props.onClose }/>

                <div>
                    <MapButtonSliderItem 
                        name="Share your position" 
                        symbol={ <MapPinIcon className="h-5 w-5" /> }
                    />
                    <MapButtonSliderItem 
                        name="Your positions" 
                        symbol={ <BookmarkIcon className="h-5 w-5" /> }
                    />
                    <MapButtonSliderItem
                        name="Your contributions"
                        symbol={ <PencilSquareIcon className="h-5 w-5" /> }
                    />
                    <MapButtonSliderItem 
                        name="Your events"
                        symbol={ <ServerIcon className="h-5 w-5" /> }
                    />
                    <MapButtonSliderItem 
                        name="Manage data"
                        symbol={ <ServerIcon className="h-5 w-5" /> }
                    />
                </div>

                <div>
                    <MapButtonSliderItem 
                        name="Add missing place" 
                        symbol={ <PuzzlePieceIcon className="h-5 w-5" /> }
                    />

                    <MapButtonSliderItem 
                        name="Add friend" 
                        symbol={ <UserPlusIcon className="h-5 w-5" /> }
                    />
                </div>

                <div>
                    <MapButtonSliderItem 
                        name="Parameters" 
                        symbol={ <Cog8ToothIcon className="h-5 w-5" /> }
                    />
                </div>

            </div>

            <div>
                <HorizontalLine />
                <div className="pb-12 pt-4 flex flow-row items-center justify-center gap-6  pointer-events-auto">
                    <PublicIconForDiscord />
                    <PublicIconForGithub />
                    <PublicIconForTelegram />
                    <PublicIconForTwitter />
                </div>
            </div>

        </div>
    );
}