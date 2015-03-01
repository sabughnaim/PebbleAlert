#include <pebble.h>

#define BUFF 64
static Window*window;
static TextLayer* text_layer;

static AppSync sync;
static uint8_t syncbuffer[BUFF];

static void window_load(Window* window){
  Layer* window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);
  
  window_set_background_color(window, GColorImperialPurple);

  text_layer=text_layer_create((GRect) {
    .origin={0,62},
    .size = {bounds.size.w,30}
  });
  text_layer_set_text(text_layer, "Emergency Response");
  text_layer_set_text_alignment(text_layer, GTextAlignmentCenter);
  text_layer_set_background_color(text_layer, GColorClear);
  text_layer_set_text_color(text_layer, GColorChromeYellow);
  layer_add_child(window_layer, text_layer_get_layer(text_layer));
}
static void window_unload(Window* window){
  text_layer_destroy(text_layer);
}
static void init(void){
  window=window_create();
  window_set_window_handlers(window, (WindowHandlers){
    .load = window_load,
    .unload = window_unload
  });
  bool animated=true;
  app_message_open(BUFF, BUFF);
  window_stack_push(window, animated);
}
static void deinit(void){
  window_destroy(window);
}
  
int main(void) {
  init();
  app_event_loop();
  deinit();
}