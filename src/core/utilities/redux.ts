const mergeForms = ( ...forms: any[] ) =>
 forms.reduce(( acc: any, form: any ) => {
  for ( let param in form ) {
   const value: any = form[param];

   if ( typeof value == null || typeof value == undefined ) continue; 

   acc[param] = value;
  }

  return acc;
 }, {});

export function formsReducer<T> ( INITIAL_STATE: T, ACTIONS: any )
{
 return function ( state: T = INITIAL_STATE, action: any ): T
 {
  let partial: Partial<T>;

  for ( let actionType in ACTIONS ) {
   if ( actionType == action.type ) {
    const { name, form } = action.payload;
    const initialFormState = (INITIAL_STATE as any)[name] as any;

    partial = {
     [name]: mergeForms(initialFormState, form)
    } as T;
   }
  }

  return partial ? { ...(state as any), ...(partial as any) } : state;
 }
}
