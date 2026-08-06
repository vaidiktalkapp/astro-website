import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # 1. Fix Text Testimonials map end
            text_target = '''                  <span className="text-[10px] font-bold text-[#16a34a] bg-green-50 border border-green-100 rounded-full px-2 py-1">✓ Verified</span>
              </div>
            ))}'''
            text_replace = '''                  <span className="text-[10px] font-bold text-[#16a34a] bg-green-50 border border-green-100 rounded-full px-2 py-1">✓ Verified</span>
                </div>
              </div>
            ))}'''
            content = content.replace(text_target, text_replace)

            # 2. Fix Video Testimonials map end
            video_target = '''                  <iframe loading="lazy" className="w-full h-full" src={https://www.youtube.com/embed/?rel=0&modestbranding=1} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            ))}
            </div>
                  ))}
                </div>
              </div>
            </div>
          )}'''
            video_replace = '''                  <iframe loading="lazy" className="w-full h-full" src={https://www.youtube.com/embed/?rel=0&modestbranding=1} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              ))}
            </div>
          </div>'''
            # But wait, not all files have the ))} </div> </div> </div> )} garbage at the end!
            
            # Let's clean up video testimonials globally using a targeted regex:
            # We want to replace from <iframe ... allowFullScreen /> down to the end of the Video Testimonials block, and then just cleanly close the block.
            
            # Actually, I can just find:
            # <iframe loading="lazy" className="w-full h-full" src={https://www.youtube.com/embed/?rel=0&modestbranding=1} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            # ... and everything after it until <p className="text-center mt-8">
            # and replace it with clean closing divs.
            
            clean_video_end = '''                  <iframe loading="lazy" className="w-full h-full" src={https://www.youtube.com/embed/?rel=0&modestbranding=1} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center mt-8">'''
          
            content = re.sub(
                r'                  <iframe loading="lazy" className="w-full h-full".*?allowFullScreen \/>.*?<p className="text-center mt-8">',
                clean_video_end,
                content,
                flags=re.DOTALL
            )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Divs forcefully fixed!")
