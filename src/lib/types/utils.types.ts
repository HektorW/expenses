export type WithTarget<TTarget, TEvent = Event> = TEvent & {
	currentTarget: TTarget
}
